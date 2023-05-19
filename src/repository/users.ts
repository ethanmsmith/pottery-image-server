import { User } from '_generated/graphql';
import { connection } from './database.js';

const all = (): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        let users: User[] = new Array<User>();
        connection().all("SELECT guid, githublogin, name, avatar FROM user",
            (err, rows: { guid: string, githublogin: string, name: string, avatar: string }[]) => {
                rows.forEach(row => {
                    users.push({
                        "id": row.guid,
                        "name": row.name,
                        "githubLogin": row.githublogin,
                        "avatar": row.avatar,
                    })
                });
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
    });
}

const count = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        connection().get("SELECT count(*) as count FROM user",
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