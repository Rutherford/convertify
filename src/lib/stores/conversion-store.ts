import { create } from 'zustand';

type ConversionFile = {
  id: string;
  file: File;
  sourceFormat: string;
  targetFormat: string;
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
  resultUrl?: string;
  createdAt: Date;
};

type ConversionState = {
  files: ConversionFile[];
  currentFile: ConversionFile | null;
  addFile: (file: File, targetFormat: string) => void;
  updateFileStatus: (id: string, status: ConversionFile['status'], progress?: number) => void;
  setFileError: (id: string, error: string) => void;
  setFileResult: (id: string, resultUrl: string) => void;
  removeFile: (id: string) => void;
  clearCompleted: () => void;
  setCurrentFile: (id: string | null) => void;
};

export const useConversionStore = create<ConversionState>((set) => ({
  files: [],
  currentFile: null,
  
  addFile: (file: File, targetFormat: string) => {
    const id = crypto.randomUUID();
    const sourceFormat = file.name.split('.').pop()?.toLowerCase() || '';
    
    const newFile: ConversionFile = {
      id,
      file,
      sourceFormat,
      targetFormat,
      status: 'idle',
      progress: 0,
      createdAt: new Date(),
    };
    
    set((state) => ({
      files: [newFile, ...state.files],
      currentFile: newFile,
    }));
    
    return id;
  },
  
  updateFileStatus: (id, status, progress = 0) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status, progress: status === 'completed' ? 100 : progress } : file
      ),
      currentFile: state.currentFile?.id === id 
        ? { ...state.currentFile, status, progress: status === 'completed' ? 100 : progress }
        : state.currentFile,
    }));
  },
  
  setFileError: (id, error) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status: 'failed', error } : file
      ),
      currentFile: state.currentFile?.id === id 
        ? { ...state.currentFile, status: 'failed', error }
        : state.currentFile,
    }));
  },
  
  setFileResult: (id, resultUrl) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status: 'completed', progress: 100, resultUrl } : file
      ),
      currentFile: state.currentFile?.id === id 
        ? { ...state.currentFile, status: 'completed', progress: 100, resultUrl }
        : state.currentFile,
    }));
  },
  
  removeFile: (id) => {
    set((state) => {
      const newFiles = state.files.filter((file) => file.id !== id);
      let newCurrentFile = state.currentFile;
      
      if (state.currentFile?.id === id) {
        newCurrentFile = newFiles[0] || null;
      }
      
      return {
        files: newFiles,
        currentFile: newCurrentFile,
      };
    });
  },
  
  clearCompleted: () => {
    set((state) => {
      const newFiles = state.files.filter((file) => 
        file.status !== 'completed' && file.status !== 'failed'
      );
      
      return {
        files: newFiles,
        currentFile: state.currentFile?.status === 'completed' || state.currentFile?.status === 'failed' 
          ? newFiles[0] || null
          : state.currentFile,
      };
    });
  },
  
  setCurrentFile: (id) => {
    set((state) => ({
      currentFile: id ? state.files.find((file) => file.id === id) || null : null,
    }));
  },
}));
