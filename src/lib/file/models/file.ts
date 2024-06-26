import mongoose, { Model } from 'mongoose';

type File = {
    _id?: string;
    filepath: string;
};
const FileSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    filepath: { type: String, required: true },
});

let FileModel: Model<File> = mongoose.models.File;
if (!FileModel) {
    FileModel = mongoose.model<File>('File', FileSchema);
}

export { FileModel };
export type { File };
