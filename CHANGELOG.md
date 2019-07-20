# Change Log

## [Unreleased]
### Changed
- No useLayoutEffect for invoking listeners (which leads de-opt sync mode)

## [0.6.0] - 2019-07-15
### Changed
- Prefer createContainer to default context (#5)

## [0.5.0] - 2019-07-13
### Changed
- Warn if useValue is not statically defined

## [0.4.0] - 2019-06-14
### Added
- Add createContainer
### Changed
- Rename to simple provider (breaking change)

## [0.3.0] - 2019-06-13
### Changed
- Add customContext support
- Fix useDispatch
- Remove unnecessary batchedUpdates
- Split useTrackedState and useTracked

## [0.2.0] - 2019-06-13
### Changed
- Properly useEffect in TrackedProvider

## [0.1.0] - 2019-06-12
### Added
- Initial experimental release
