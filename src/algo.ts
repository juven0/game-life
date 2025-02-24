export type position = {
  x: number;
  y: number;
};

const mainLop = (n: number, G: position[]) => {
  let Gp = G;
  const Ga = Gp;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let nv: position[] = [];
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          const a = Ga.find((e) => e.x === k && e.y === l);
          if (a !== undefined) {
            nv = [...nv, a];
            nv = nv.filter((e) => !(e.x === i && e.y === j));
          }
        }
      }
      const a = Ga.find((e) => e.x === i && e.y === j);
      if (a !== undefined) {
        if (nv.length === 2 || nv.length === 3) {
          Gp = Gp.filter((e) => !(e.x === a.x && e.y === a.y));
          Gp = [...Gp, a];
        } else {
          Gp = Gp.filter((e) => !(e.x === i && e.y === j));
        }
      } else {
        if (nv.length === 3) {
          Gp = [...Gp, { x: i, y: j }];
        }
      }
    }
  }
  return Gp;
};

export default mainLop;
