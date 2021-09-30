import {FileAttributes} from "@model/file";
import File, {FilePk} from "@entity/file";

export default interface FileRepository {
    findByPk(pk: FilePk): Promise<File | null>;
    findAllByUsername(username: string): Promise<File[]>;
    existsByPk(pk: FilePk): Promise<boolean>;
    save(file: FileAttributes): Promise<void>;
    deleteByPk(pk: FilePk): Promise<void>;
    updateFileName({username, fileName, newFileName}: {username: string, fileName: string, newFileName: string}): Promise<void>;
}