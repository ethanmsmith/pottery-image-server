import { User } from '_generated/graphql';
import { connection } from './database.js';
import { v4 as uuidv4 } from 'uuid';

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

const get = (token: string): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        connection().get("SELECT guid, githublogin, name, avatar FROM user WHERE github_token = ?", token,
            (err, row: { guid: string, githublogin: string, name: string, avatar: string }) => {
                if (undefined === row) {
                    resolve({} as User);
                } else {

                    resolve({
                        "id": row.guid,
                        "name": row.name,
                        "githubLogin": row.githublogin,
                        "avatar": row.avatar,
                    })
                }
                    if (err) {
                    reject(err);
                }
            });
    });
}

const addOrUpdate = (userInfo: { user: User, token: string }): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
        connection().get("SELECT guid FROM user WHERE githubLogin = ?", userInfo.user.githubLogin, (err, resultRow) => {
            if (err) {
                reject(err);
            }
            if (undefined === resultRow) {
                connection().run('INSERT INTO user VALUES (?,?,?,?,?)', uuidv4(), userInfo.user.githubLogin, userInfo.user.name, userInfo.user.avatar, userInfo.token, err => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(userInfo.user);
                    }
                });
            }
            else {
                connection().run('UPDATE user SET name = ?, avatar = ?, github_token = ? WHERE githubLogin = ?', userInfo.user.name, userInfo.user.avatar, userInfo.token, userInfo.user.githubLogin, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(userInfo.user);
                    }
                })
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
    count,
    get,
    addOrUpdate
}