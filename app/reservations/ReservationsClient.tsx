'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface ReservationsClientProps{
    currentUser?: SafeUser | null;
    reservations: SafeReservation[]
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
    currentUser,
    reservations
})=>{
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservations cancelled");
            router.refresh();
        })
        .catch(()=>{
          toast.error("Something went wrong!")
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router]);
    return (
        <Container>
            <Heading 
               title="Reservations"
               subtitle="Bookings on your properties"
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
                       actionlabel="Cancel guest reservation"
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

export default ReservationsClient;