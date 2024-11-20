// page.ts

export interface PhotoInfo {
    filename: { value: string };
    caption?: {
      value: string;
      show?: boolean;
    };
    description?: {
      value: string;
      show?: boolean;
    };
    alt?: {
      value: string;
      show?: boolean;
    };
    tags?: {
      value: string[];
      show?: boolean;
    };
    location?: {
      value: string | null;
      show?: boolean;
    };
    rotationAngle?: {
      value: number;
      show?: boolean;
    };
    flipImage?: {
      value: boolean;
      show?: boolean;
    };
    GPSLatitude?: {
      value: string;
      show?: boolean;
    };
    GPSLongitude?: {
      value: string;
      show?: boolean;
    };
    GPSAltitude?: {
      value: string;
      show?: boolean;
    };
    ImageHeight?: {
      value: string;
      show?: boolean;
    };
    ImageWidth?: {
      value: string;
      show?: boolean;
    };
    FileSize?: {
      value: string;
      show?: boolean;
    };
    ISOSpeedRatings?: {
      value: string;
      show?: boolean;
    };
    ExposureTime?: {
      value: string;
      show?: boolean;
    };
    FNumber?: {
      value: string;
      show?: boolean;
    };
    FocalLength?: {
      value: string;
      show?: boolean;
    };
    WhiteBalance?: {
      value: string;
      show?: boolean;
    };
    DateTimeOriginal?: {
      value: string;
      show?: boolean;
    };
    Make?: {
      value: string;
      show?: boolean;
    };
    Model?: {
      value: string;
      show?: boolean;
    };
    LensModel?: {
      value: string;
      show?: boolean;
    };
    Flash?: {
      value: string;
      show?: boolean;
    };
    MeteringMode?: {
      value: string;
      show?: boolean;
    };
    SceneCaptureType?: {
      value: string;
      show?: boolean;
    };
    Orientation?: {
      value: string;
      show?: boolean;
    };
    Software?: {
      value: string;
      show?: boolean;
    };
    ColorSpace?: {
      value: string;
      show?: boolean;
    };
    SensingMethod?: {
      value: string;
      show?: boolean;
    };
    ShutterSpeedValue?: {
      value: string;
      show?: boolean;
    };
    ApertureValue?: {
      value: string;
      show?: boolean;
    };
  }
  
  