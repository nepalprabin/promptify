'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";

const MyProfile = () => {
    const {data:session} = useSession();
    const router = useRouter();

    const [prompts, setPrompts] = useState([]);

    const handleEdit = (prompt) => {
      router.push(`/update-prompt?id=${prompt._id}`)
    }

    const handleDelete = async (prompt) => {
      const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${prompt._id.toString()}`, {
            method: 'DELETE',
          });
          const filteredPrompts = prompts.filter((p) => p._id !== prompt._id)
          setPrompts(filteredPrompts)
        } catch (err) {
          console.log(err);
        }
      }

    }

    useEffect(() => {
    const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await response.json();

      setPrompts(data);
    }
    if (session?.user.id) fetchPrompts();
  }, [])

  return (
    <div>
      <Profile
        name="My" 
        desc='Welcome to my profile'
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    </div>
  )
}

export default MyProfile
