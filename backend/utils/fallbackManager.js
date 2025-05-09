class FallbackManager {
    constructor(maxFails = 3) {
        this.maxFails = maxFails;
        this.failCount = 0;
    }

    registerFailure() {
        this.failCount += 1;
        if (this.failCount >= this.maxFails) {
            this.reset();
            return {
                type: 'hard',
                message: "I'm sorry, I still don't get it. Let's start over."
            };
        }
        return {
            type: 'soft',
            message: "I didn't quite understand. Could you rephrase that?"
        };
    }

    reset() {
        this.failCount = 0;
    }
}

module.exports = FallbackManager;