import * as PIXI from "pixi.js-legacy";
import userEvent from "@testing-library/user-event";

import helloPixi from "../src/index";

// Sets up the `@testing-library/user-event` keyboard and mouse events.
const user = userEvent.setup();

// Get the shared ticker and don't start it since we are not rendering
// anything yet.
const ticker = PIXI.Ticker.shared;
ticker.autoStart = false;
ticker.stop();

beforeEach(() => {
    // Need to avoid faking everything but `requestAnimationFrame` or else the
    // tests will time out.
    // https://github.com/testing-library/react-hooks-testing-library/issues/631#issuecomment-1196616173
    jest.useFakeTimers({
        doNotFake: [
            "setImmediate",
            "setInterval",
            "setTimeout",
            "cancelAnimationFrame",
            "cancelIdleCallback",
            "clearImmediate",
            "clearInterval",
            "clearTimeout",
            "nextTick",
            "queueMicrotask",
        ],
    });
});

afterEach(() => {
    // Runs all of the pending timers and switches back to real timers.
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

/**
 * **Note: This is not a very good test since it does multiple things but it
 * showcases how to use the user inputs and fake timers.
 */
it("should create a new Pixi text object, change the text, and move it", async () => {
    const app = new PIXI.Application({ sharedTicker: true });

    // Create a new text object with our default text exported from
    // `src/index.ts`.
    const pixiText = new PIXI.Text(helloPixi);
    app.stage.addChild(pixiText);

    // Simulate the user typing " - from bob!" to add onto the text.
    const addToText = (event: KeyboardEvent) => {
        pixiText.text =
            pixiText.text + (event.key === "Space" ? " " : event.key);
    };
    window.addEventListener("keydown", addToText);
    await user.keyboard("{Space}-{Space}{f}{r}{o}{m}{Space}{b}{o}{b}{!}");
    window.removeEventListener("keydown", addToText);

    // Render the application every frame and also move our text so that we
    // can show how the sinon clock works.
    ticker.add(() => {
        app.renderer.render(app.stage);
        pixiText.x += 1;
    });
    ticker.start();

    // Simulate 2 seconds of time passing.
    jest.advanceTimersByTime(2000);

    // After 2 seconds of time passing, with 16ms per frame, that's 125 frames
    // that have been processed so the text's `x` position should be at 125.
    expect(pixiText.x).toBe(125);

    // The text should now be "Hello, Pixi! - from bob!".
    expect(pixiText.text).toBe("Hello, Pixi! - from bob!");
});
