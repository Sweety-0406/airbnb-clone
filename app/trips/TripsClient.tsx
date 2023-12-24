'use client';

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";

interface TripsClientProps{
    currentUser?:SafeUser | null;
    reservations: SafeReservation[]
}
const TripsClient:React.FC<TripsClientProps>=({
    currentUser,
    reservations
})=>{
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservations Cancelled");
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
              title = "Trips"
              subtitle="Where you've been and where you're going" 
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
                {reservations.map((reservation:any)=>(
                    <ListingCard 
                       key={reservation.id}
                       data={reservation.listing}
                       actionId={reservation.id}
                       actionlabel="Cancel reservation"
                       onAction={onCancel}
                       disabled = {deletingId === reservation.id}
                       reservation={reservation}
                       currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient;