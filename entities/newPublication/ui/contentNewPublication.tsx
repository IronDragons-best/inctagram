import React from 'react';
import { Input, TextAreaComponent } from '@irondragons/ui-lib-inctagram';
import styles from './contentNewPublication.module.scss';
import Image from 'next/image';
import photo5 from '@/public/assets/img/stalinLike.jpg';
import s from '@/views/profile/pages/userProfile/userPost/post/ui/post.module.scss';

const dataLocations = [
  {title: "New York", place: "Washington Square Park"},
  {title: "Moscow", place: "Red Square"},
]

export const ContentNewPublication = () => {
  return (
    <>
      <div className={styles.headerContent}>
        <div className={styles.contentPost}>
          <div className={styles.userAvatar}>
            <Image src={photo5} alt={'photo beach'} />
          </div>
          <span className={s.Username}>
                  URLProfile
          </span>
        </div>

        <TextAreaComponent fullWidth={true}
                           label={'Add publication descriptions'} id={'1'}
                           placeholder={'Text-area'}
        />
      </div>
      
      <div className={styles.footerContent}>
        <Input placeholder={"choose your destiny"} fullWidth={true} label={'Add location'} inputType={"location"} />
        {dataLocations.map(dataLocation => (
            <>
              <h5>{dataLocation.title}</h5>
              <span>{dataLocation.place}</span>
            </>
        ))}
      </div>
    </>
  );
};