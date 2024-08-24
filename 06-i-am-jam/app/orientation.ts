
export function waitForHorizontalOrientation(): Promise<boolean> {
    if (screen == null || screen.orientation == null) { 
        return Promise.resolve(true);
    }

    validateOrientation();

    screen.orientation.addEventListener("change", function(event) {
        console.log("Orientation changed");
        validateOrientation();
    });
    

    if (window.innerHeight < window.innerWidth || screen.orientation.type === "landscape-primary") {
        return Promise.resolve(true);
    }

    var promise = new Promise<boolean>((resolve) => {
        const orientationHandler = () => {
            if (screen.orientation.type == "landscape-primary") {
                window.removeEventListener("resize", orientationHandler);
                resolve(true);
            }
        };

        screen.orientation.addEventListener("change", orientationHandler);
    });

    return promise;
}

export function validateOrientation() {
    const orientationWarning = document.getElementById("orientation-warning") as HTMLDivElement;

    switch (screen.orientation.type) {
        case "landscape-primary":
            // console.log("That looks good.");
            orientationWarning.classList.remove("bad-orientation");
            break;
        case "landscape-secondary":
            // console.log("Mmmh… the screen is upside down!");
            orientationWarning.classList.add("bad-orientation");
            break;
        case "portrait-secondary":
        case "portrait-primary":
            // console.log("Mmmh… you should rotate your device to landscape");            
            orientationWarning.classList.add("bad-orientation");
            break;
        default:
            // console.log("The orientation API isn't supported in this browser :(");            
            orientationWarning.classList.remove("bad-orientation");
      }

      console.log("Orientation: " + screen.orientation.type);
}