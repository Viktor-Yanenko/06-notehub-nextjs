'use client';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';

export default function NoteDetailsClient({ id }: { id: number }) {
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })

  if (isLoading) return <p>Loading, please wait...</p>
  if (isError || !note) return <p>Something went wrong.</p>

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note.content}</p>
                {/* <p className={css.date}>Created date</p> */}
            </div>
        </div>
    )
}