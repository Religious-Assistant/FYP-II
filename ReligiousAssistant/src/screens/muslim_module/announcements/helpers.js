
export const dateDifference = (createdAt) => {
    let dt1 = new Date(createdAt);
    let dt2 = new Date(); //Now
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    let years=0;
    let days=0;
    let months=0;
    let hours=0
    let mins=0;

    return Math.abs(Math.round(diff));
  };
