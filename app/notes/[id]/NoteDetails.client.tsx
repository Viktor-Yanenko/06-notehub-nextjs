'use client';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })

    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note?.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note?.content}</p>
                <p className={css.date}>Created date</p>
            </div>
            {isLoading && <p>Loading, please wait...</p>}
            {isError || !note && <p>Something went wrong.</p>}
        </div>
    )
}