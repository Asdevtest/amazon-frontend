/* tslint:disable */
/* eslint-disable */
/**
 * Test swagger
 * testing the fastify swagger api
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { ApiV1AnnouncementsMySpec } from './api-v1-announcements-my-spec';

/**
 * 
 * @export
 * @interface InlineResponse20040Request
 */
export interface InlineResponse20040Request {
    /**
     * Гуид продукта
     * @type {string}
     * @memberof InlineResponse20040Request
     */
    _id?: string;
    /**
     * Ключ заявки числом
     * @type {number}
     * @memberof InlineResponse20040Request
     */
    humanFriendlyId?: number;
    /**
     *  DRAFT - черновик, заявка создана, но не опубликована  PUBLISHED - заявка опубликована, изменять такую заявку можно! Для того чтобы не произошло неожиданных изменений при  установке этого статуса рассчитываем чек сумму на основе данных самой заявки и деталей при создании и каждом изменении. После этого при публикации предложения будем отправлять этот хеш. Если хеш был изменен то предложение не публикуется и  сервер отдает соответствующую ошибку. Так же из этого статуса можно перевести обратно в статус CREATED (черновик) IN_PROGRESS - по заявке уже есть хотябы одно предложение, изменять такую заявку нельзя, можно только закрыть или снять  с публикации, остановить прием предложений по этой заявке. После этого статуса можно закрыть заявку или она может быть  закрыта автоматически FORBID_NEW_PROPOSALS - снять с публикации, остановить прием предложений по этой заявке, этот статус разрешает закрыть  заявку или перевести ее обратно в статус PUBLISHED/IN_PROGRESS в зависимости от того есть ли по этой заявке уже предложения.  Так же после этого статуса можно закрыть заявку или она может быть автоматически закрыта. Финальные статусы, после них нельзя менять ни заявку ни статус: COMPLETE_PROPOSALS_AMOUNT_ACHIEVED - заявка закрылась автоматически при достижении кол-ва выполненных предложений CANCELED_BY_CREATOR - заявка закрыта пользователем EXPIRED - истек срок заявки, автоматически закрылась Технические статусы: VERIFYING_BY_ADMIN - проверяется адином, такая заявка не отображается в общей выдаче, этот статус выставляет сам админ TO_CORRECT_BY_ADMIN - статус выставляет админ после проверки заявки, после этого статуса можно выставить только статус  READY_TO_VERIFY_BY_ADMIN и эта заявка должна попасть обратно на проверку админу. Если админ проверил все и все ок, то он  выставляет статус CREATED. READY_TO_VERIFY_BY_ADMIN - статус устанавливается клиентом для того чтобы админ проверил изменения по заявке CANCELED_BY_ADMIN - закрыто админом  Статусы для проверки заявки у супервизера (пока вроде не нужно, но статусы можно создать): READY_TO_VERIFY_BY_SUPERVISOR - клиент отправляет заявку на проверку спервизеру, в этом статусе заявка не опубликована  на бирже и подавать предложения нельзя, изменять заявку так же нельзя. Заявки с таким статусом доступны всем супервизерам.  (пока этот функционал вроде не нужен) VERIFYING_BY_SUPERVISOR - в процессе проверки заявки супервизером, в этом статусе заявка не опубликована на бирже и  подавать предложения нельзя, изменять заявку так же нельзя (пока этот функционал вроде не нужен) TO_CORRECT_BY_SUPERVISOR - статус выставляет супервизор после проверки заявки, после этого статуса можно выставить только  статус READY_TO_VERIFY и эта заявка должна попасть обратно на проверку ТОМУ ЖЕ супервизеру что и проверял ее ранее.  (поле supervisorId). Если супервизор проверил все и все ок, то он выставляет статус PUBLISHED. (опять же пока можно заложить  статус но логику не реализовывать) 
     * @type {string}
     * @memberof InlineResponse20040Request
     */
    status?: InlineResponse20040RequestStatusEnum;
    /**
     * 
     * @type {ApiV1AnnouncementsMySpec}
     * @memberof InlineResponse20040Request
     */
    spec?: ApiV1AnnouncementsMySpec;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineResponse20040RequestStatusEnum {
    Draft = 'DRAFT',
    Published = 'PUBLISHED',
    InProcess = 'IN_PROCESS',
    ForbidNewProposals = 'FORBID_NEW_PROPOSALS',
    CompleteProposalsAmountAchieved = 'COMPLETE_PROPOSALS_AMOUNT_ACHIEVED',
    CanceledByCreator = 'CANCELED_BY_CREATOR',
    Expired = 'EXPIRED',
    ReadyToVerifyByAdmin = 'READY_TO_VERIFY_BY_ADMIN',
    VerifyingByAdmin = 'VERIFYING_BY_ADMIN',
    ToCorrectByAdmin = 'TO_CORRECT_BY_ADMIN',
    CanceledByAdmin = 'CANCELED_BY_ADMIN',
    ReadyToVerifyBySupervisor = 'READY_TO_VERIFY_BY_SUPERVISOR',
    VerifyingBySupervisor = 'VERIFYING_BY_SUPERVISOR',
    ToCorrectBySupervisor = 'TO_CORRECT_BY_SUPERVISOR'
}


