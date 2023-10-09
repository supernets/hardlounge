import {expect} from "chai";

import Msg from "../../server/models/msg";
import User from "../../server/models/user";
import {LinkPreview} from "../../server/plugins/irc-events/link";

describe("Msg", function () {
	["from", "target"].forEach((prop) => {
		it(`should keep a copy of the original user in the \`${prop}\` property`, function () {
			const prefixLookup = {modeToSymbol: {a: "&", o: "@"}};
			const user = new User(
				{
					modes: ["o"],
					nick: "foo",
				},
				prefixLookup as any
			);
			const msg = new Msg({[prop]: user});

			// Mutating the user
			user.setModes(["a"], prefixLookup as any);
			user.nick = "bar";

			// Message's `.from`/etc. should still refer to the original user
			expect(msg[prop]).to.deep.equal({mode: "@", nick: "foo"});
		});
	});

	describe("#findPreview(link)", function () {
		const msg = new Msg({
			previews: [
				{
					body: "",
					head: "Example Domain",
					link: "https://example.org/",
					thumb: "",
					type: "link",
					shown: true,
				},
				{
					body: "",
					head: "Hard Lounge",
					link: "https://git.supernets.org/supernets/hardlounge",
					thumb: "",
					type: "link",
					shown: true,
				},
			] as LinkPreview[],
		});

		it("should find a preview given an existing link", function () {
			expect(
				msg.findPreview("https://git.supernets.org/supernets/hardlounge/")?.head
			).to.equal("Hard Lounge");
		});

		it("should not find a preview that does not exist", function () {
			expect(msg.findPreview("https://git.supernets.org/supernets/hardlounge")).to.be
				.undefined;
		});
	});
});
