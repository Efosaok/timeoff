export const isPendedRevokeLeave = (status: number) => status === 4;
export const isNew = (status: number) => status === 1;
export const isRejected = (status: number) => status === 3;
export const isApproved = (status: number) => status === 2;
export const isCancelled = (status: number) => status === 5;
