const fs = require("fs");
const file = "src/app/juwelen/page.tsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/<WordExplainComp([\s\S]*?)\/>/g, (match, props) => {
  if (props.includes('theme="slate"') || props.includes("alwaysShow={false}")) {
    let newProps = props.replace(/position="[^"]+"/g, 'position="TOP"');
    return `<WordExplainComp${newProps}/>`;
  } else {
    let newProps = props;
    if (!newProps.includes("showArrow")) {
      newProps = newProps.replace(
        /(\s+)$/,
        "\n                showArrow={true}$1"
      );
    }
    return `<WordExplainComp${newProps}/>`;
  }
});

fs.writeFileSync(file, content);
console.log("done");
