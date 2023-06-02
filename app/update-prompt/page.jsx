'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [submitting, setSubmitting] = useState(false);
    const promptId = searchParams.get('id')
    const [prompt, setPrompt] = useState({
        prompt: "",
        tag: ""
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPrompt({
                prompt: data.prompt,
                tag: data.tag 
            })
        }
        if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        if (!promptId) return alert("Prompt id not found!")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: prompt.prompt,
                    tag: prompt.tag
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false)
        }

    }
    return (
        <Form
            type="Edit"
            post={prompt}
            setPost={setPrompt}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt
