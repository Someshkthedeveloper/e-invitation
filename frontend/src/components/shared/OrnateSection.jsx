import React from 'react'

export default function OrnateSection({ id, className = '', children, style = {} }) {
  return (
    <section id={id} className={`ornate-section ${className}`} style={style}>
      <div className="ornate-section__divider ornate-section__divider--top">
        <span className="ornate-section__divider-line" />
        <span className="ornate-section__divider-gem">✦</span>
        <span className="ornate-section__divider-line" />
      </div>
      <div className="ornate-section__content">
        {children}
      </div>
      <div className="ornate-section__divider ornate-section__divider--bottom">
        <span className="ornate-section__divider-line" />
        <span className="ornate-section__divider-gem">✦</span>
        <span className="ornate-section__divider-line" />
      </div>
    </section>
  )
}
