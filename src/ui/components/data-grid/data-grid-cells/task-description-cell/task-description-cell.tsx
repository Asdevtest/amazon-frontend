/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'

import { BoxArrow, CubeIcon, EditIcon, EqualIcon, PlusIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './task-description-cell.style'

interface TaskDescriptionCellProps {
  task: any
}

export const TaskDescriptionCell: FC<TaskDescriptionCellProps> = memo(({ task }) => {
  const { classes: styles, cx } = useStyles()
  const renderProductImages = (product: any, key: any, box?: any) => (
    <div key={key && key} className={styles.imgWrapper}>
      <img src={getAmazonImageUrl(product?.product.images[0])} alt="box" className={styles.taskDescriptionImg} />

      <div className={styles.taskDescriptionCountWrapper}>
        {box?.amount > 1 && <p className={styles.taskDescriptionSuperBox}>{`SB ${box.amount}`}</p>}

        <p className={styles.imgNum}>{product?.amount}</p>
      </div>
    </div>
  )

  const renderBox = (box: any, key: any) => (
    <div key={key && key} className={styles.imagesWrapper}>
      <div className={cx(styles.standartBoxWrapper)}>
        {box.items.length &&
          box.items.map((product: any, productIndex: number) => renderProductImages(product, productIndex, box))}
      </div>
    </div>
  )

  const renderBlockProductsImages = (
    <div className={styles.blockProductsImagesWrapper}>
      {task.boxesBefore && (
        <div className={styles.sideWrapper}>
          {task.boxesBefore.map((box: any, index: number) =>
            index !== task.boxesBefore.length - 1 ? (
              <div key={index} className={styles.renderBoxWrapper}>
                {renderBox(box, index)}
                <PlusIcon className={styles.taskDescriptionIcon} />
              </div>
            ) : (
              renderBox(box, index)
            ),
          )}
        </div>
      )}

      <EqualIcon className={styles.taskDescriptionIcon} />

      <div className={styles.sideWrapper}>
        {task.boxes?.map((box: any, index: number) =>
          index !== task.boxes.length - 1 ? (
            <div key={index} className={styles.renderBoxWrapper}>
              {renderBox(box, index)}
              <PlusIcon className={styles.taskDescriptionIcon} />
            </div>
          ) : (
            renderBox(box, index)
          ),
        )}
      </div>
    </div>
  )

  const taskMergeDescription = () => <div className={styles.taskTableCell}>{renderBlockProductsImages}</div>

  const taskDivideDescription = () => <div className={styles.taskTableCell}>{renderBlockProductsImages}</div>

  const taskReceiveDescription = () => (
    <div className={styles.blockProductsImagesWrapper}>
      <div className={styles.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} alt="big-box" />
        <BoxArrow className={styles.boxArrowSvg} />

        <div className={styles.gridBoxesWrapper}>
          {task.boxesBefore.map((el: any, index: number) => (
            <div key={index} className={styles.gridBoxWrapper}>
              {el.amount > 1 && (
                <div className={styles.superboxWrapper}>
                  <CubeIcon className={styles.cubeIconSvg} />
                  <p className={styles.imgNum}>{el.amount > 1 && ` x${el.amount}`}</p>
                </div>
              )}
              <div className={styles.gridEditWrapper}>
                {el.items.map((product: any, productIndex: number) => renderProductImages(product, productIndex))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={styles.blockProductsImagesWrapper}>
      <div className={styles.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} />
        <EditIcon className={styles.boxEditSvg} />

        {task.boxesBefore[0]?.amount > 1 && (
          <div className={styles.superboxWrapper}>
            <CubeIcon className={styles.cubeIconSvg} />
            <p className={styles.imgNum}>{task.boxesBefore[0].amount > 1 && ` x${task.boxesBefore[0].amount}`}</p>
          </div>
        )}

        <div className={styles.gridEditWrapper}>
          {task.boxesBefore[0]?.items.map((product: any, productIndex: number) =>
            renderProductImages(product, productIndex),
          )}
        </div>
      </div>
    </div>
  )

  const renderTaskDescription = (type: string) => {
    switch (type) {
      case TaskOperationType.MERGE:
        return <>{taskMergeDescription()}</>
      case TaskOperationType.SPLIT:
        return <>{taskDivideDescription()}</>
      case TaskOperationType.RECEIVE:
        return <>{taskReceiveDescription()}</>
      case TaskOperationType.EDIT:
        return <>{taskEditDescription()}</>
      case TaskOperationType.EDIT_BY_STOREKEEPER:
        return <>{taskEditDescription()}</>
    }
  }

  return <div className={styles.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
})
