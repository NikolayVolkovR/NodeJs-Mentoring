process.stdin.on('data', (data) => {
    const value = data.toString().trim();
    if (value === 'exit') {
        process.exit();
    }

    process.stdout.write(`${[...data.toString().trim()].reverse().join('')}\n\n\n`)
});

process.on('exit', () => {
    process.stdout.write('\n\nYou are out of input\n\n');
});