

type position = {
    x: number
    y: number
}

const mainLop = (n: number, duration: number): [position]=> {
    let nv: [position] = []

    for (let t = 0; t < duration; t++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                for (let k = i-1; k < i+1; k++) {
                    for (let l = j-1; l < j+1; l++) {

                    }
                }
            }
        }
    }

    return nv
}
