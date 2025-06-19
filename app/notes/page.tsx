import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import dynamic from "next/dynamic";

const NotesClient = dynamic(() => import('./Notes.client'), { ssr: false });

export default async function NotesPage() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['notes'],
        queryFn: () => fetchNotes('', 1),
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient/>
        </HydrationBoundary>
    )
}