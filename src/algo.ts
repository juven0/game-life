export type position = {
  x: number;
  y: number;
};

const mainLop = (n: number, G: position[]) => {
  let Gp = G;
  for (let d = 0; d < 1; d++) {
    const Ga = Gp;
    for (let i = 10; i < 13; i++) {
      for (let j = 10; j < 13; j++) {
        let nv: position[] = [];
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            const a = Ga.find((e) => e.x === k && e.y === l);
            if (a !== undefined) {
              nv = [...nv, a];
              //   console.log(nv);
            }
          }
          console.log();
        }
        const a = Ga.find((e) => e.x === i && e.y === j);
        if (a !== undefined) {
          if (nv.length === 2 || nv.length === 3) {
            Gp = [...Gp, a];
          } else {
            Gp = Gp.filter((e) => !(e.x === i && e.y === j));
          }
        } else {
          if (nv.length === 3) {
            console.log("ao");
            Gp = [...Gp, { x: i, y: j }];
          }
        }
      }
    }
    console.log(Gp);
  }
};

export default mainLop;
