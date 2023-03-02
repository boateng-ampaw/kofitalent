export async function GetPosts(id) {
    const user = id ? `p=${id}` : null
    const resp = await fetch(`https://badmin.kofitalent.com/notifications.php?${user}`)
    const posts = await resp.json()

    console.log('The post',id, posts);

    // if(!posts) return <p>Loading</p>

    return { posts }
}