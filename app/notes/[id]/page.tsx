import { fetchNoteById } from "../../../lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
    params: { id: string };
}

export default async function NoteDetails({ params }: Props) {
    const noteId = Number(params.id)
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={noteId}/>
        </HydrationBoundary>
    )
}