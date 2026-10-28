const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Run real source with explicit service-boundary fakes, without loading SDKs or credentials.
module.exports = function loadTypeScript(file, imports = {}) {
  const filename = path.resolve(file);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  });
  const module = { exports: {} };
  const requireFake = (name) => {
    if (!(name in imports)) throw new Error(`Unexpected dependency in ${file}: ${name}`);
    return imports[name];
  };
  const run = vm.runInThisContext(`(function(require, module, exports) {${outputText}\n})`, { filename });
  run(requireFake, module, module.exports);
  return module.exports;
};
