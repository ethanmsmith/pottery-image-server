import { Photo, PhotoCategory } from '_generated/graphql';
import { connection } from './database.js';
import { v4 as uuidv4 } from 'uuid';

const all = (): Promise<Photo[]> => {
    return new Promise<Photo[]>((resolve, reject) => {
        let photos: Photo[] = new Array<Photo>();
        connection().all("SELECT P.guid, created, description, P.name, category, githublogin, U.name as username, U.guid as uuid FROM photos P join user U on P.postedBy = U.guid",
            (err, rows: { guid: string, created: string, description: string, name: string, username: string, githublogin: string, uuid: string, category: string }[]) => {
                rows.forEach(row => {
                    photos.push({
                        "id": row.guid,
                        "created": row.created,
                        "description": row.description,
                        "name": row.name,
                        "url": "",
                        "postedBy": {
                            "id":row.uuid,
                            "githubLogin": row["githublogin"],
                            "name": row.username
                        },
                        "category": row.category as PhotoCategory
                    })
                });
                if (err) {
                    reject(err);
                } else {
                    resolve(photos);
                }
            }
        )
    })
};

const count = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        connection().get("SELECT count(*) as count FROM photos",
            (err, users: { count: number }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users.count);
                }
            }
        );
    });
}

const add = (args: any): Photo => {
    const newPhoto = {
        id: uuidv4(),
        ...args,
    }
    connection().run("INSERT INTO photos VALUES (?,?,?,?,?,?)", newPhoto.id, newPhoto.created, newPhoto.description, newPhoto.name, newPhoto.postedBy.guid, newPhoto.category);

    return newPhoto;
;}

export default {
    all,
    count,
    add
}