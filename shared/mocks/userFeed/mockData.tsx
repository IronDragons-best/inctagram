import { nanoid } from '@reduxjs/toolkit'
import photo1 from '@/public/assets/img/photo_01.png'
import photo2 from '@/public/assets/img/photo_02.png'
import photo3 from '@/public/assets/img/photo_03.jpg'
import photo4 from '@/public/assets/img/photo_04.png'
// import photo5 from '@/public/assets/img/stalinLike.jpg'

export const mockUsers = [
  {
    userId: nanoid(),
    userAvatar: photo1,
    userName: 'UserName',
    userTime: new Date(Date.now() - 22 * 60 * 1000), // мок время, 22мин.
    userContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
              eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor
              incd.mpor incd.mpo.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
              eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor
              incd.mpor incd.mpo.`,
  },
  {
    userId: nanoid(),
    userAvatar: photo2,
    userName: 'UserName',
    userTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2мин. назад
    userContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
              eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor
              incd.mpor incd.mpo.`,
  },
  {
    userId: nanoid(),
    userAvatar: photo3,
    userName: 'UserName',
    userTime: new Date(Date.now() - 49 * 60 * 1000), // 49мин. назад
    userContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
              eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit`,
  },
  {
    userId: nanoid(),
    userAvatar: photo4,
    userName: 'UserName',
    userTime: new Date(Date.now() - 2 * 60 * 60 * 60 * 1000), // 5 дней назад
    userContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
              eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor
              incd.mpor incd.mpo.`,
  },
  // {
  //   userId: nanoid(),
  //   userAvatar: photo5,
  //   userName: 'UserName',
  //   userTime: new Date(Date.now() - 2 * 60 * 1000), // 2мин
  //   userContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
  //             eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor
  //             incd.mpor incd.mpo.`,
  // },
]
