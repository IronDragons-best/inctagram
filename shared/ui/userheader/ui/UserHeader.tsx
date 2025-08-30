'use client'

import photo2 from '@/public/assets/img/photo_02.png'
import { TextModal } from '@/shared/modals/textModal'
import { useDeletePostMutation, useUpdatePostMutation } from '@/shared/schemas/api/postsApi'
import { Dropdown } from '@/shared/ui/dropdown'
import { EditPost } from '@/views/profile/pages/userProfile/userPost/editPost'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'
import s from './userHeader.module.scss'

type Props = {
  isUserTime?: boolean
  userTime?: string
  children?: React.ReactNode
  showActions?: boolean
  postId: number
  userId: string
  srcArray: string[]
  userName: string
}

export const UserHeader = ({
  isUserTime,
  srcArray,
  userTime,
  showActions = true,
  postId,
  userId,
  userName,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()

  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const handleEditClick = () => {
    setEditModalOpen(true)
    setDropdownOpen(false)
  }

  const handleSaveEdit = async (newDescription: string) => {
    try {
      await updatePost({ id: postId, body: { description: newDescription } }).unwrap()
      setEditModalOpen(false)
      setDropdownOpen(false)
    } catch (err) {
      console.error('Failed to update post', err)
    }
  }

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsDeleting(true)

    try {
      const res = await deletePost(postId)
      if (!('error' in res)) console.log('Deleted post', postId)

      setConfirmOpen(false)
      setDropdownOpen(false)

      router.push(`/profile/${userId}`)
    } catch (err) {
      console.error(err)
      setConfirmOpen(false)
      setDropdownOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const MOCK_DATA = [
    { icon: 'edit-2-outline', label: 'Edit Post', onClick: handleEditClick },
    {
      icon: 'trash-outline',
      label: 'Delete Post',
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setDropdownOpen(false)
        setConfirmOpen(true)
      },
    },
  ]

  return (
    <div className={s.postTitle}>
      <div className={s.userAvatar}>
        <Image src={photo2} alt={'photo beach'} />
      </div>
      <div className={s.userNameContainer}>
        <span className={s.userName}>{userName}</span>
        {isUserTime && <div className={s.userTime}>{userTime}</div>}
      </div>
      {showActions && (
        <div
          className={s.moreIcon}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            if (!isDeleting && !confirmOpen && !editModalOpen) {
              setDropdownOpen(prev => !prev)
            }
          }}
        >
          <UniversalIcon name={'more-horizontal-outline'} />
          <Dropdown
            onClose={() => setDropdownOpen(false)}
            isModalOpen={dropdownOpen}
            items={MOCK_DATA}
          />
          {editModalOpen && (
            <EditPost
              isModalOpen={editModalOpen}
              srcArray={srcArray}
              openModal={() => setEditModalOpen(false)}
              onSave={handleSaveEdit}
            />
          )}
          <TextModal
            title={'delete post'}
            description={'Are you sure you want to delete this post?'}
            openModal={() => {
              setConfirmOpen(false)
            }}
            isModalOpen={confirmOpen}
          >
            <>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeletePost(e)}
                variant="outline"
                disabled={isDeleting}
              >
                Yes
              </Button>
              <Button
                className={s.modalButton}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  setConfirmOpen(false)
                }}
              >
                No
              </Button>
            </>
          </TextModal>
        </div>
      )}
    </div>
  )
}
