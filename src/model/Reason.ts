export type Reason = {
  description: string;
  createdAt: Date;
  pohAddress: string;
  klerosCase: string;
};

export const pohProfileURL = (pohAddress: string) => {
  const url = `https://app.proofofhumanity.id/profile/${pohAddress}`;
  return url;
};

export const klerosCaseURL = (klerosCase: string) => {
  const url = `https://resolve.kleros.io/cases/${klerosCase}`;
  return url;
};
