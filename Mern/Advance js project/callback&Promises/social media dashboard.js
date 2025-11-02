//...................Project: Social Media Dashboar...............
//
//
async function fetchUserProfile(userid) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    return { id: userid, name: `User${userid}`, avatar: `Avatar${userid}` }
}

async function fetchUserPosts(userid) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    return [{ id: 1, content: "first Post", likes: 10 },
    { id: 2, content: "2nd Post", likes: 5 }

    ];
}

async function fetchUserFollowers(userid) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    return ['follower1', 'follower2', 'follower3']
}
async function fetchUserFollowing(userid) {
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    return ['following1', 'following2']
}

async function CreateDashboard(userid) {

    try {
        console.log("Loading Dashboard")

        const [profile, posts, followers, following] = await Promise.all([
            fetchUserProfile(userid),
            fetchUserPosts(userid),
            fetchUserFollowers(userid),
            fetchUserFollowing(userid)
        ]);


        const dashboard = {
            profile,
            posts,
            stats: {
                totalpost: posts.length,
                followersCount: followers.length,
                followingCount: following.length,
                totalLikes: posts.reduce((post, sum) => sum + post.likes, 0)
            }
        }
        console.log('Dashboard ready:', dashboard);
        return dashboard
    }


    catch (error) {
        console.error('Failed to create dashboard:', error);
        throw error;
    }
}

CreateDashboard(1)