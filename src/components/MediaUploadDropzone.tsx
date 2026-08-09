"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Movie as MovieIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { uploadPropertyMedia, deletePropertyMedia } from "@/lib/api/properties";
import { PropertyMedia } from "@/lib/types";

interface MediaUploadDropzoneProps {
  type: "image" | "video";
  mediaList: (string | PropertyMedia)[];
  onChange: (mediaList: (string | PropertyMedia)[]) => void;
  maxFiles?: number;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
}

export default function MediaUploadDropzone({
  type,
  mediaList,
  onChange,
  maxFiles = 10,
}: MediaUploadDropzoneProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFiles = async (files: File[]) => {
    if (mediaList.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} ${type}s.`);
      return;
    }

    const newUploads = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
    }));

    setUploadingFiles((prev) => [...prev, ...newUploads]);

    for (const upload of newUploads) {
      try {
        const result = await uploadPropertyMedia(upload.file, (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === upload.id ? { ...f, progress: percentCompleted } : f
            )
          );
        });

        // Add to mediaList - MUST use functional state update approach since this is in a loop
        // but we'll use a hack to get the latest by capturing it in an array or doing it differently.
        // Actually since we don't have functional update for `onChange`, we should await them all
        // and THEN onChange, OR just onChange one by one but reading the latest from a ref.
        // Easiest is to accumulate them and update at the end, OR just rely on standard React closures 
        // if we do Promise.all. 
      } catch (error) {
        console.error("Upload failed", error);
        alert(`Failed to upload ${upload.file.name}`);
      }
    }
    
    // Better parallel upload logic:
    const results = await Promise.all(
      newUploads.map(async (upload) => {
        try {
          const result = await uploadPropertyMedia(upload.file, (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === upload.id ? { ...f, progress: percentCompleted } : f
              )
            );
          });
          return result;
        } catch (e) {
          console.error(e);
          return null;
        } finally {
          setUploadingFiles((prev) => prev.filter((f) => f.id !== upload.id));
        }
      })
    );
    
    const successfulUploads = results.filter(Boolean);
    if (successfulUploads.length > 0) {
      onChange([...mediaList, ...successfulUploads]);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files).filter((file) =>
          file.type.startsWith(`${type}/`)
        );
        processFiles(files);
      }
    },
    [mediaList, maxFiles, type]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = async (index: number) => {
    const item = mediaList[index];
    const newList = [...mediaList];
    newList.splice(index, 1);
    onChange(newList);

    if (typeof item === "object" && item.publicId) {
      try {
        await deletePropertyMedia(item.publicId, type);
      } catch (err) {
        console.error("Failed to delete media from Cloudinary", err);
      }
    }
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        sx={{
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: dragActive ? "action.hover" : "background.default",
          borderStyle: "dashed",
          borderColor: dragActive ? "primary.main" : "divider",
          borderWidth: 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: "action.hover",
            borderColor: "primary.main",
          },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={type === "image" ? "image/*" : "video/*"}
          multiple
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Drag & Drop or Click to Upload
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type === "image"
            ? "Supports JPG, PNG, WEBP"
            : "Supports MP4, MOV, AVI (Max 15MB recommended)"}
        </Typography>
      </Paper>

      {(mediaList.length > 0 || uploadingFiles.length > 0) && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {mediaList.map((media, index) => {
              const url = typeof media === "string" ? media : media.url;
              return (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "100%",
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "grey.100",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {type === "image" ? (
                      <img
                        src={url}
                        alt="Preview"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src={url}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(index)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": { bgcolor: "error.main" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              );
            })}

            {uploadingFiles.map((f) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={f.id}>
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "100%",
                    borderRadius: 1,
                    overflow: "hidden",
                    bgcolor: "grey.100",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={f.progress}
                      size={40}
                      thickness={4}
                    />
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, fontWeight: 500 }}
                    >
                      {f.progress}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
