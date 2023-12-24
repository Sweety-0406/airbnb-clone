import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../action/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import { getListings } from "../action/getListings";

const PropertiesPage =async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                  title="Unauthorized"
                  subtitle="Please login!"
                 />
            </ClientOnly>
        )
            
    }
    const listings = await getListings({
        userId : currentUser.id
    });

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                  title="No properties found."
                  subtitle="Looks like you have no properties."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient
              currentUser={currentUser}
              listings={listings} 
            />
        </ClientOnly>
    )

}

export default PropertiesPage;