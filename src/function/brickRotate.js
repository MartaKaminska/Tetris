// math rotation function from stackoverflow
export const rotateMatrix = (brick) =>
{ 
	const N = brick.shape[0].length;

    for(let i = 0; i < 3; i++) {
        for (let x = 0; x < N / 2; x++) 
        { 
            for (let y = x; y < N-x-1; y++) 
            { 
                let temp = brick.shape[x][y]; 
                brick.shape[x][y] = brick.shape[y][N-1-x]; 
                brick.shape[y][N-1-x] = brick.shape[N-1-x][N-1-y]; 
                brick.shape[N-1-x][N-1-y] = brick.shape[N-1-y][x]; 
                brick.shape[N-1-y][x] = temp; 
            } 
        } 
    }

} 