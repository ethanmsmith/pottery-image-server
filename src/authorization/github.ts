import { GithubToken, GithubCredentials, GithubUser } from "_types/github"

const requestGithubToken = (credentials: GithubCredentials): Promise<GithubToken> => {
    return fetch('https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(res => res.json() as Promise<GithubToken>).catch(error => { throw new Error(JSON.stringify(error)) })
}

const requestGithubUserAccount = (access_token: string): Promise<GithubUser> => {
    return fetch(`https://api.github.com/user`,
    {
        method: 'GET',
        headers: {
            Authorization: `token ${access_token}`
        },
    }).then(res => res.json() as Promise<GithubUser>);
}

export const authorizeWithGithub = async (credentials: GithubCredentials) => {
    const access_token = (await requestGithubToken(credentials)).access_token;
    const githubUser = await requestGithubUserAccount(access_token);
    return { ...githubUser, access_token };
}
