export namespace IUploadFile {
  export interface DTO {
    file: File;
    fileURL: string;
  }

  export type Model = string;
}

export interface IUploadFile {
  uploadFile(params: IUploadFile.DTO): Promise<IUploadFile.Model>;
}
