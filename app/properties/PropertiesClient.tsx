'use client';

import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps{
    currentUser?:SafeUser | null;
    listings: SafeListing[]
}
const PropertiesClient:React.FC<PropertiesClientProps>=({
    currentUser,
    listings
})=>{
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("Listing deleted");
            router.refresh();
        })
        .catch((error)=>{
            toast.error("something went wrong");
            // toast.error(error?.response?.data?.error);
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router])
    return (
        <Container>
            <Heading
              title = "Properties"
              subtitle="List of your properties" 
            />
            <div className="
              mt-10
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            ">
                {listings.map((listing:any)=>(
                    <ListingCard 
                       key={listing.id}
                       data={listing}
                       actionId={listing.id}
                       actionlabel="Delete property"
                       onAction={onCancel}
                       disabled = {deletingId === listing.id}
                       currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient;