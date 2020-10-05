# ssec-swc-115-tx.origin | Solidity | Security | SWC-115 | Authorization through tx.origin

---

## Reference

* [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples | by vasa | HackerNoon.com | Medium](https://medium.com/hackernoon/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)

* [SWC-115 · Overview](https://swcregistry.io/docs/SWC-115#:~:text=Description-,tx.,calls%20into%20a%20malicious%20contract.)

---

**Howto Install & build**

```shell
git clone https://github.com/shamb0/ssec-swc-115-tx.origin.git
cd ssec-swc-115-tx.origin
yarn install
yarn build
```

### Phishable ( Vulnarable One )

```shell
master$ DEBUG="info*,error*,debug*" yarn run test
yarn run v1.22.4
$ yarn run test:contracts
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  EtherGame Attack Test
  info:Phisable-Test Admin :: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff +0ms
  info:Phisable-Test Usr1 :: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0 +1ms
  info:Phisable-Test Usr2 :: 0xD1D84F0e28D6fedF03c73151f98dF95139700aa7 +0ms
  info:Phisable-Test Usr3 :: 0xd59ca627Af68D29C547B91066297a7c469a7bF72 +0ms
  debug:Phisable-Test Network Gas price @ 8000000000 +0ms
  debug:Phisable-Test S1-Ent wallet bal :: 10.0 +5ms
  debug:Phisable-Test Phishable @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +55ms
  debug:Phisable-Test Phishable balance :: 1.5 +2ms
  debug:Phisable-Test S1-Ext wallet bal :: 8.499371374 +2ms
  debug:Phisable-Test S2-Ent wallet bal :: 8.499371374 +2ms
  debug:Phisable-Test Network Gas price @ 8000000000 +2ms
  debug:Phisable-Test PhishableAttack @ 0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA +25ms
  debug:Phisable-Test Phishable balance :: 0.0 +2ms
  debug:Phisable-Test S2-Ext wallet bal :: 8.49897497 +2ms
  debug:Phisable-Test S3-Ent :: 8.49897497 +3ms
  debug:Phisable-Test b4 attack Usr1 Bal :: 10.0 +2ms
Info@Phishable.sol::withdrawAll Invok withdraw tx.origin(0x17ec8597ff92c3f44523bdc65bf0f1be632917ff) owner(0x17ec8597ff92c3f44523bdc65bf0f1be632917ff)
Info@PhishableAttack.sol::fallback method attacker@(0x63fc2ad3d021a4d7e64323529a55a9442c444da0)
  debug:Phisable-Test after attack Usr1 Bal :: 11.5 +32ms
  debug:Phisable-Test S3-Ext :: 8.498675682 +2ms
    ✓ tst-item-001-run-attack (39ms)
  debug:Phisable-Test Phishable balance :: 0.0 +3ms
  debug:Phisable-Test PhishableAttack balance :: 0.0 +3ms
  debug:Phisable-Test S4-Ext wallet bal :: 8.498675682 +2ms
  debug:Phisable-Test Phishable balance :: 0.0 +3ms
  debug:Phisable-Test PhishableAttack balance :: 0.0 +2ms
  debug:Phisable-Test S5-Ext wallet bal :: 8.498675682 +6ms


  1 passing (357ms)

Done in 7.82s.
```

---
