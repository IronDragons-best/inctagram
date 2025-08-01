'use client';

import * as React from 'react';
import { useState } from 'react';
import s from './post.module.scss';
import { UniversalIcon } from '@irondragons/ui-lib-inctagram';
import { PostUserComment } from '@/entities/userComment/';
import { PostActions } from '@/shared/ui/postActions/ui/PostActions';
import Image from 'next/image';

import photo1 from '@/public/assets/img/photo_01.png';
import photo2 from '@/public/assets/img/photo_02.png';
import photo3 from '@/public/assets/img/photo_03.jpg';
import photo4 from '@/public/assets/img/photo_04.png';
import photo5 from '@/public/assets/img/stalinLike.jpg';
import { LikesCount } from '@/shared/ui/likesCount/ui/LikesCount';
import { usePathname, useRouter } from 'next/navigation';
import { PublicationModal } from '@/shared/modals/publicationModal';
import { PublishComment } from '@/shared/ui/publishComment';



const photosArray = [photo1, photo2, photo3, photo4, photo5];

type Props = {
  openModal?: () => void;
  isModalOpen: boolean;
  id?: string;
  title?: 'withPublish' | 'withoutPublish';
  slides?: string[];
  srcArray?: string[];
};

export const Post = ({
                       openModal,
                       isModalOpen,
                       title,
                     }: Props) => {
  const [modalOpen, setModalOpen] = useState(isModalOpen);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const handleOpenModal = () => {
    router.push(pathname);
    setModalOpen(false);
  };
  
  return (
    
    <PublicationModal isModalOpen={true}>
      <>
        <div className={s.PostTitle}>
          <div className={s.UserAvatar}>
            <Image src={photo2} alt={'photo beach'} />
          </div>
          <span className={s.Username}>
            UserName
          </span>
          <div className={s.MoreIcon}>
            <UniversalIcon name={'more-horizontal-outline'} />
          </div>
        </div>
        <div className={s.PostUserCommentWrapper}>
          {/* TODO переделать потом на map */}
          <PostUserComment
            userAvatar={photo1}
            userName={'UserName'}
            userComment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          />
          <PostUserComment
            userAvatar={photo3}
            userName={'UserName'}
            userComment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            isLikedIcon
            isAnswer />
          <PostUserComment
            userAvatar={photo5}
            userName={'UserName'}
            userComment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
              ' eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            isLikedIcon
            isLiked
            isAnswer
            likesCount={1} />
        </div>
        <div className={s.SummaryLikesWrapper}>
          <div className={s.PostLikesWrapper}>
            <PostActions />
          </div>
          <div className={s.AvatarGroupSummaryWrapper}>
            {/* TODO хз пока че передавать пропсами */}
            <LikesCount />
          </div>
          <div className={s.PostMetaTimestamp}>
            July 3, 2021
          </div>
        </div>
        <div className={s.AddPostCommentWrapper}>
          <PublishComment />
        </div>
      </>
    </PublicationModal>
  );
};