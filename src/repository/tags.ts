import { connection } from './database.js';

const all = (): Promise<{ photoId: string, userId: string }[]> => {
    return new Promise<{ photoId: string, userId: string }[]>((resolve, reject) => {
        let tags: { photoId: string, userId: string }[] = new Array<{ photoId: string, userId: string }>();
        connection().all("SELECT photo, user FROM tags",
            (err, rows: { photo: string, user: string }[]) => {
                rows.forEach(row => {
                    tags.push({
                        "photoId": row.photo,
                        "userId": row.user,
                    })
                });
                if (err) {
                    reject(err);
                } else {
                    resolve(tags);
                }
            });
    });
}

const count = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        connection().get("SELECT count(*) as count FROM tags",
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

export default {
    all,
    count
}