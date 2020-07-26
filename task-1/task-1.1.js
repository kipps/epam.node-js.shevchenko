process.stdin.on('data', (data) => {
    if(!data.toString().includes('exit')) {
        process.stdout.write(data.toString().split("").reverse().join(""));
        process.stdout.write('\n');
    } else {
        console.log('Process completed!');
        process.exit();
    }
});