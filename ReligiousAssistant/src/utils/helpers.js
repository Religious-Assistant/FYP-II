
export const dateDifference = (createdAt) => {
    let dt1 = new Date(createdAt);
    let dt2 = new Date(); //Now
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    return Math.abs(Math.round(diff));
  };
