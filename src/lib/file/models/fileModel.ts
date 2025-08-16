import mongoose, { Model } from 'mongoose';
import { File } from './file';

const FileSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    filepath: { type: String, required: true },
});

let FileModel: Model<File> = mongoose.models.File;
if (!FileModel) {
    FileModel = mongoose.model<File>('File', FileSchema);
}

export { FileModel };
