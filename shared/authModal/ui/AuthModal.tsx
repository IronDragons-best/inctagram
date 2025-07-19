import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./authModal.module.scss";
import { Button, Card, UniversalIcon } from "@irondragons/ui-lib-inctagram";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  openModal: () => void;
  isModalOpen: boolean;
  children: ReactNode;
};

export const AuthModal = ({
  openModal,
  isModalOpen,
  description,
  title,
  children,
}: Props) => (
  <Dialog.Root onOpenChange={openModal} open={isModalOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <div className={styles.Heading}>
          <Dialog.Title className={styles.Title}>{title}</Dialog.Title>
          <Dialog.Close asChild>
            <Button
              className={styles.IconButton}
              aria-label="Close"
              tabIndex={-1}
            >
              <UniversalIcon name={"close"} />
            </Button>
          </Dialog.Close>
        </div>

        <Dialog.Description className={styles.Description}>
          {description}
        </Dialog.Description>

        <div className={styles.Children}>
          <Dialog.Close asChild>{children}</Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
