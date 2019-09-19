const watch = require('watch');
const { exec } = require('child_process');
const colors = require('colors');

const ignoreFile = f => f.includes('.mock') || f.includes('test') || f.includes('lib') || f.includes('json');

console.log('Building package...'.cyan);

exec(`npm run build`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Package is built'.yellow);

  watch.createMonitor(
    'src/',
    {
      interval: 0.5,
      ignoreDirectoryPattern: /node_modules|lib|__mocks__|web-cli-sdk/,
    },
    monitor => {
      console.log('👀 started watching files'.green);

      monitor.on('created', (f, stat) => {
        if (ignoreFile(f)) return;

        console.log('new file created:'.green, f);
        console.log('');
        console.log('rebuilding...'.cyan);
      });

      monitor.on('changed', (f, curr, prev) => {
        if (ignoreFile(f)) return;

        const outputFile = f.replace('src', 'lib');
        const buildSpinner = console.log(f, 'rebuilding...'.cyan);

        exec(`npx babel ${f} --out-file ${outputFile}`, (err, stdout, stderr) => {
          if (err) {
            buildSpinner.fail(err);
          }
          colors.green(f);
        });
      });

      monitor.on('removed', (f, stat) => {
        if (ignoreFile(f)) return;

        console.log('file removed:'.green, f);
        console.log('');
        console.log('rebuilding...'.cyan);
      });
    },
  );
});
