import getCurrentUser from "./getCurrentUser";
import prisma from '@/app/libs/prismadb';

export default async function getFavoritesListing() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds || [])]
                }
            }
        })

        const SafeFavorites = favorites.map((favorite)=>({
            ...favorite,
            createdAt : favorite.createdAt.toISOString()
        }))
        return SafeFavorites;
    } catch (error:any) {
        throw new Error(error);
    }
}